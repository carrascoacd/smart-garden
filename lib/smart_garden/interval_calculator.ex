defmodule SmartGarden.IntervalCalculator do
  import Ecto.Query

  def next_interval_for(device, state) do
    polling_interval = from(i in SmartGarden.Interval, 
                        where: i.device_id == ^device.id and i.action == "polling")
      |> SmartGarden.Repo.one
    control_interval = from(i in SmartGarden.Interval, 
                        where: i.device_id == ^device.id and 
                        i.action != "polling")
      |> SmartGarden.Repo.one
    
    choose_interval(control_interval, polling_interval, state)
  end

  defp choose_interval(nil = _control_interval, polling_interval, _state), do: polling_interval
  defp choose_interval(%{force_open: true} = _control_interval, polling_interval, _state) do
    %{polling_interval | action: "open-valve"}
  end
  defp choose_interval(%{action: "reset"} = _control_interval, polling_interval, _state) do
    %{polling_interval | action: "reset"}
  end
  defp choose_interval(%{active: false} , polling_interval, _state), do: polling_interval
  defp choose_interval(control_interval, polling_interval, state) do
    matches_date? = interval_matches_date?(control_interval, NaiveDateTime.utc_now)
    case {matches_date?, state} do
      {true, _state} ->
        %{polling_interval | action: "open-valve"}
      {false, _state} ->
        %{polling_interval | action: "close-valve"}
    end
  end

  defp interval_matches_date?(interval, date) do
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
    max_interval_time = Time.add(min_interval_time, interval.value, :milliseconds)
    time = NaiveDateTime.to_time date

    Enum.member?(interval_weekdays, Date.day_of_week(date)) and
      (Time.compare(time, min_interval_time) == :gt and
      Time.compare(time, max_interval_time) == :lt) or
      Time.compare(time, max_interval_time) == :eq or
      Time.compare(time, max_interval_time) == :eq
  end
end
