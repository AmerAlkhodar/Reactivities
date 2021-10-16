using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string massage, string details = null)
        {
            StatusCode = statusCode;
            Massage = massage;
            Details = details;
        }

        public int StatusCode { get; set; }

        public string Massage { get; set; }

        public string Details { get; set; }
    }
}