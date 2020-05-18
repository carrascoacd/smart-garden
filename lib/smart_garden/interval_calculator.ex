defmodule SmartGarden.IntervalCalculator do
  alias Crontab.CronExpression.Parser, as: CrontabParser
  alias Crontab.CronExpression.Parser, as: CrontabParser

  import Ecto.Query

  def next_interval_for(device, state) do
    interval =
      SmartGarden.Repo.one(from(i in SmartGarden.Interval, where: i.device_id == ^device.id))

    choose_interval(interval, state)
  end

  defp choose_interval(interval, state) do
    matches_date? = interval_matches_date?(interval, NaiveDateTime.utc_now())

    case {matches_date?, state} do
      {false, "open"} ->
        %{interval | action: "close-valve"}

      {true, "close"} ->
        %{interval | action: "open-valve"}

      _otherwise ->
        interval
    end
  end

  defp interval_matches_date?(interval, date) do
    case CrontabParser.parse(interval.execution_schedule) do
      {:ok, cron_expression} ->
        Crontab.DateChecker.matches_date?(cron_expression, date)

      _otherwise ->
        false
    end
  end
end
