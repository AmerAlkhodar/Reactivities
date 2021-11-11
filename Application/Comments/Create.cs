using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public Guid ActivityId { get; set; }
            public string Body { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _accessor;

            public Handler(DataContext  context , IMapper mapper , IUserAccessor accessor)
            {
                _context = context;
                _mapper = mapper;
                _accessor = accessor;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
               var activity = await _context.Activities.FindAsync(request.ActivityId);

               if(activity == null) return null ;

               var user =await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _accessor.GetUserName());

               var comment = new Comment {
                   Activity = activity,
                   Author = user , 
                   Body = request.Body,
                   
               };

               activity.Comments.Add(comment);

               var result =await _context.SaveChangesAsync() > 0 ;

               if(result) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));

               return Result<CommentDto>.Failure("Faild to add Comment");

            }
        }
    }
}