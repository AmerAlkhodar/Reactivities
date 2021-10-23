using System;
using System.Collections.Generic;
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



        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateActivity(Guid Id , Activity activity){
                activity.Id = Id ; 

                return HandleResult(await Mediator.Send(new Update.Command {Activity = activity}));

        }


        [HttpDelete("{Id}")]

        public async Task<IActionResult> DeleteActivity(Guid Id){

        return HandleResult(await Mediator.Send(new Delete.Command{Id = Id}));

        }


    }
}