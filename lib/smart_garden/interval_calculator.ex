defmodule SmartGarden.IntervalCalculator do
  alias Crontab.CronExpression.Parser, as: CrontabParser
  alias SmartGarden.Interval

  def next_interval_for(device, _state) do
    Interval.get_all_by_device(device.id)
    |> Enum.sort(&(&1.index < &2.index))
    |> Enum.find(&choose_interval/1)
  end

  defp choose_interval(interval) do
    interval_matches_date?(interval, NaiveDateTime.utc_now())
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
