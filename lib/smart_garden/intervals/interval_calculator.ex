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
    
    if control_interval != nil and interval_matches_date?(control_interval, NaiveDateTime.utc_now) do
      control_interval
    else
      polling_interval
    end
  end

  def interval_matches_date?(interval, date) do
    cron_execution_schedule = Crontab.CronExpression.Parser.parse! interval.execution_schedule
    interval_hour = if cron_execution_schedule.hour == [:*] do
      date.hour
    else
      Enum.at cron_execution_schedule.hour, 0
    end
    interval_minute = if cron_execution_schedule.minute == [:*] do
      date.minute
    else
      Enum.at cron_execution_schedule.minute, 0
    end
    interval_weekdays = if cron_execution_schedule.weekday == [:*] do
      [Date.day_of_week(date)]
    else
      cron_execution_schedule.weekday
    end
    min_interval_time = Time.from_erl!({interval_hour, interval_minute, 0})
    max_interval_time = Time.add(min_interval_time, 60 * (interval.value + 1), :seconds)
    time = NaiveDateTime.to_time date

    Enum.member?(interval_weekdays, Date.day_of_week(date)) and
      (Time.compare(time, min_interval_time) == :gt and
      Time.compare(time, max_interval_time) == :lt) or
      Time.compare(time, max_interval_time) == :eq or
      Time.compare(time, max_interval_time) == :eq
  end

end