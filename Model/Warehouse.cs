using System;
namespace backend.Model
{
    //this is the model that we use to save data in the object
    public class Warehouse
    {
        public Warehouse()
        {
        }
        public string cars {
            get; set;
        }
        public int _id {
            get; set;
        }
        public string name {
            get; set;
        }
        public string location {
            get; set;
        }
    }
}
