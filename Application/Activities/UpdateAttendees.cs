using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class UpdateAttendees
    {
        public class Command : IRequest<Result<Unit>>
        {

            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>

        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _Context;

            public Handler(DataContext Context, IUserAccessor userAccessor)
            {
                _Context = Context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //get the activity with Attendees and And users that attend this activity 
                var activity = await _Context.Activities
                .Include(x => x.Attendees).ThenInclude(a => a.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);


                if (activity == null) return null;

                // get the current user from the database 
                var user = _Context.Users.FirstOrDefault(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;


                // get HostUsername for this activity 
                var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                // get the currentuser attendeance by username 
                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);


                if (attendance != null && user.UserName == hostUsername)
                    activity.isCancelled = !activity.isCancelled;

                if (attendance != null && user.UserName != hostUsername)
                    activity.Attendees.Remove(attendance);

                if (attendance == null){

                        attendance = new ActivityAttendee {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false  
                        };

                        activity.Attendees.Add(attendance);

                }

                var result = await _Context.SaveChangesAsync() > 0;

                 return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem Updateing Attendees");


            }
        }
    }
}