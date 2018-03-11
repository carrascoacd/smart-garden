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
    
    if control_interval != nil and Crontab.DateChecker.matches_date?(
      ~e[#{control_interval.execution_schedule}], NaiveDateTime.utc_now) do
      control_interval
    else
      polling_interval
    end
  end
  
end