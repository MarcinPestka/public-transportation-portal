using Microsoft.AspNetCore.Mvc;
using departures;
using Newtonsoft.Json;

namespace ztmApi.Controllers;

[ApiController]
[Route("[controller]")]
public class departuresController : ControllerBase
{
    private const string departuresUrl = "https://ckan2.multimediagdansk.pl/departures?stopId=";
    private const string lineListUrl = "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851/download/routes.json";
    private const string stopsListUrl = "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json";

    [HttpGet("GetDepartures")]
    public async Task<List<final>> Get(string id = "33080")
    {
        Task<string> content = getDepartures(id);
        allDepartures delaysData  = JsonConvert.DeserializeObject<allDepartures>(content.Result);

        content = getBusData();
        todaysUpdate busesData  = JsonConvert.DeserializeObject<todaysUpdate>(content.Result);

        matchBusNames(delaysData,busesData);

        List<final> finalList = new List<final>();
        createFinalList(delaysData.departures,finalList);

        return finalList;
    }
    [HttpGet("GetAllStops")]
    public async Task<List<finalStop>> GetStops()
    {
        Task<string> content = getStringFromUrl(stopsListUrl);
        todaysUpdateStops allStops = JsonConvert.DeserializeObject<todaysUpdateStops>(content.Result);

        List<finalStop> finalStopsList = new List<finalStop>();
        createFinalStopsList(allStops.today.stops,finalStopsList);

        return finalStopsList;
    }

    private async Task<string> getStringFromUrl(string url){
        HttpClient client = new HttpClient();
        HttpResponseMessage response = await client.GetAsync(url);
        string content = await response.Content.ReadAsStringAsync();
        return content;
    }
    private async Task<string> getDepartures(string id){
        HttpClient client = new HttpClient();
        HttpResponseMessage response = await client.GetAsync(departuresUrl+id);
        string content = await response.Content.ReadAsStringAsync();
        return content;
    }
    private async Task<string> getBusData(){
        HttpClient client = new HttpClient();
        HttpResponseMessage response = await client.GetAsync(lineListUrl);
        string content = await response.Content.ReadAsStringAsync();
        return content;
    }
    private void matchBusNames(allDepartures delaysData, todaysUpdate busesData){
        var query = from x in delaysData.departures
            join y in busesData.today.routes
                on x.routeId equals y.routeId
            select new { x, y };

        foreach(var match in query)
            match.x.routeId = match.y.routeShortName;
    }
    private void createFinalList(List<departureInfo> listOfDepartures,List<final> finalList){

        foreach (departureInfo departure in listOfDepartures)
        {
            TimeSpan span = departure.estimatedTime.AddHours(1) - DateTime.Now;
            int seconds = (span.Hours*360)+(span.Minutes*60)+span.Seconds;
            String build = "";

            if (seconds < 90)
            {
                build = ">>>" + seconds;
            }
            else if (departure.delayInSeconds != null)
            {
                build = (seconds / 60).ToString() + " min"; 
            }
            else
            {
                build = departure.estimatedTime.AddHours(1).ToString("HH:mm");
            }

            final item = new final();
            item.busNumber=departure.routeId;
            item.headSign=departure.headsign;
            item.DisplayedTime=build;
            item.delaySeconds = departure.delayInSeconds;

            finalList.Add(item);
        }
    }
            private void createFinalStopsList(List<stopsInfo> list2, List<finalStop> finalList){
                foreach (stopsInfo stop2 in list2)
                {
                    finalStop stop = new finalStop();
                    stop.stopId = stop2.stopId;
                    if (stop2.subName == null)
                    {
                        stop.stopDesc = stop2.stopDesc + " 01";
                    }
                    else
                    {
                    stop.stopDesc = stop2.stopDesc + " " + stop2.subName;
                    }
                    finalList.Add(stop);
                }
        }
    
}


