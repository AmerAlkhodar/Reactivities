using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController

    {
    

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> getActivities()
        {

            return await Mediator.Send(new List.Query());

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> getActivity(Guid id)
        {


            return await Mediator.Send(new Details.Query{Id = id});

        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){

            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }



        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateActivity(Guid Id , Activity activity){
                activity.Id = Id ; 

                return Ok(await Mediator.Send(new Update.Command {Activity = activity}));

        }


        [HttpDelete("{Id}")]

        public async Task<IActionResult> DeleteActivity(Guid Id){

        return Ok(await Mediator.Send(new Delete.Command{Id = Id}));

        }


    }
}