defmodule SmartGarden.IntervalCalculator do
  import Crontab.CronExpression
  import Ecto.Query

  def next_interval_for(device) do
    polling_interval = from(i in SmartGarden.Interval, 
                        where: i.device_id == ^device.id and i.action == "polling")
      |> SmartGarden.Repo.one
    control_interval = from(i in SmartGarden.Interval, 
                        where: i.device_id == ^device.id and 
                        i.action != "polling" and i.active == true)
      |> SmartGarden.Repo.one
    
    polling_matches_date = ~e[#{polling_interval.execution_schedule}] 
      |> Crontab.DateChecker.matches_date?(NaiveDateTime.utc_now)
    if polling_matches_date or control_interval == nil do
      polling_interval
    else
      control_interval
    end
  end
  
end