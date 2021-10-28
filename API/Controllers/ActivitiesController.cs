using System;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  
    public class ActivitiesController : BaseApiController

    {
    

        [HttpGet]
        public async Task<IActionResult> getActivities()
        {

            return HandleResult(await Mediator.Send(new List.Query()));

        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> getActivity(Guid id)
        {
         
           return HandleResult(await Mediator.Send(new Details.Query{Id = id}));

        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){

            return HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));
        }


        [Authorize(Policy ="IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid Id , Activity activity){
                activity.Id = Id ; 

                return HandleResult(await Mediator.Send(new Update.Command {Activity = activity}));

        }

        [Authorize(Policy ="IsActivityHost")]
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid Id){

        return HandleResult(await Mediator.Send(new Delete.Command{Id = Id}));

        }



        [HttpPost("{id}/attend")]

        public async Task<IActionResult> Attend(Guid id){

            return HandleResult(await Mediator.Send(new UpdateAttendees.Command {Id = id}));


        }


    }
}