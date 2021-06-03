using System;
using System.Collections.Generic;
using backend.Model;
using Pomelo.Data.MySql;

namespace backend.Connector
{
    public class Conn
    {
        private string connstring;
        public Conn()
        {
            //edit this to connect to your own database
            connstring = @"server=localhost;userid=root;password=;database=warehouses";
        }
        public List<Warehouse> WarehouseList() {
            //creating list to later add table from database to it
            List<Warehouse> allCars = new List<Warehouse>();
            using (MySqlConnection connMySql = new MySqlConnection(connstring)) {
                using (MySqlCommand cmd = connMySql.CreateCommand()) {
                    //using sql language fetting all the data from warehouse table from warehouse database
                    cmd.CommandText = "Select * from warehouses.warehouses";
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Connection = connMySql;
                    connMySql.Open();
                    using (MySqlDataReader reader = cmd.ExecuteReader()) {
                        while (reader.Read()){
                            //adding model Warehouse consisting of all the elements from database to allCars list
                            allCars.Add(new Warehouse { cars = reader.GetString(reader.GetOrdinal("cars")), _id = reader.GetInt32(reader.GetOrdinal("_id")), name = reader.GetString(reader.GetOrdinal("name")), location = reader.GetString(reader.GetOrdinal("location"))});
                        }
                    }
                }
                connMySql.Close();
            }
            //returnin allCars to our function in ValuesController.cs
            return allCars;
        }
    }
}
