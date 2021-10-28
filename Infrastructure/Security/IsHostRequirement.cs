using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            //get the user id for the user who trying to update an activity from user token 
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            //if the userid = null thats mean the user in not authorize thats mean he dont have a token
            if (userId == null) return Task.CompletedTask;

            //get acitivity Id from route (Id) and parse it to Guid 
            var activityId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.FirstOrDefault(x => x.Key == "id").Value.ToString());

            //get Attendee so based on userId and activityId so now we can know if he joining any attendee
            var attendee = _dbContext.ActivityAttendee
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId).Result;

            // if the user have no attendee in this perticular activity then he don't have our permision to update the acitivity 
            if (attendee == null) return Task.CompletedTask;

            if (attendee.IsHost) context.Succeed(requirement);

            return Task.CompletedTask;





        }
    }
}