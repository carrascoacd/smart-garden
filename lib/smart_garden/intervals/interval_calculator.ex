defmodule SmartGarden.IntervalCalculator do
  import Crontab.CronExpression
  import Ecto.Query

  def next_interval_for(device) do
    polling_interval = from(i in SmartGarden.Interval, where: i.device_id == ^device.id and i.action == "polling")
      |> SmartGarden.Repo.one
    other_interval = from(i in SmartGarden.Interval, where: i.device_id == ^device.id and i.action != "polling")
      |> SmartGarden.Repo.one
    
    return_polling_interval = ~e[#{polling_interval.execution_schedule}] 
      |> Crontab.DateChecker.matches_date?(NaiveDateTime.utc_now)
    if return_polling_interval do
      polling_interval
    else
      other_interval
    end
  end
  
end