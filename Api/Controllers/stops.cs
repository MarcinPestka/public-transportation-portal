using Newtonsoft.Json;

namespace departures
{
    public class allStops
    {
        public List<stopsInfo> stops { get; set; }
    }
    public class stopsInfo
    {
        public string stopId {get;set;}
        public string stopDesc {get;set;}
        public string subName {get;set;}
    }
    public class finalStop{
        public string stopDesc { get; set; }
        public string stopId { get; set; }
    }
    public class todaysUpdateStops {
        [JsonProperty("2023-02-12")]
        public allStops today { get; set; }
    }
}