defmodule SmartGardenWeb.WeatherEntriesControllerTest do
  use SmartGardenWeb.ConnCase
  
  alias SmartGarden.Repo
  alias SmartGarden.Device
  alias SmartGarden.Interval
  alias SmartGarden.WeatherEntry
  setup do
    device = Repo.insert!(%Device{name: "Arduino Device"})
    {:ok, %{device: device}}
  end

  test "create weather_entry", %{conn: conn, device: device} do
    Repo.delete_all(WeatherEntry)

    changeset = %Interval{
      name: "Wait 1000", 
      value: 1000,
      action: "polling", 
      device: device, 
      execution_schedule: "* * * * *"}
    Repo.insert! changeset
    weather_entry_params = %{m: 1000, h: 99, t: 35, mv: 3600, sv: 3500}
    conn = post conn, device_weather_entries_path(conn, :create, device.id), w: weather_entry_params
    assert json_response(conn, 201) == %{
      "action" => "polling",
      "value" => 1000
    }
  end

  @tag here: true
  test "does not create weather_entry as it detects a recent insert", %{conn: conn, device: device} do
    Repo.delete_all(WeatherEntry)

    changeset = %Interval{
      name: "Wait 1000", 
      value: 1000,
      action: "polling", 
      device: device, 
      execution_schedule: "* * * * *"}
    Repo.insert! changeset

    weather_entry_params = %{m: 1000, h: 99, t: 35, mv: 3600, sv: 3500}

    conn = post(conn, device_weather_entries_path(conn, :create, device.id), w: weather_entry_params)
    assert json_response(conn, 201) == %{
      "action" => "polling",
      "value" => 1000
    }

    conn = post(conn, device_weather_entries_path(conn, :create, device.id), w: weather_entry_params)
    assert json_response(conn, 200) == %{
      "action" => "polling",
      "value" => 1000
    }
  end

  test "get weather_entry", %{conn: conn, device: device} do
    changeset = %WeatherEntry{moisture: 1000.0, temperature: 35.0, humidity: 30.0, device: device}
    weather_entry = Repo.insert!(changeset)
    conn = get conn, device_weather_entries_path(conn, :show, device.id, weather_entry.id)
    assert json_response(conn, 200) == weather_entry_json(weather_entry)
  end

  test "index weather_entries", %{conn: conn, device: device} do
    changeset = %WeatherEntry{moisture: 1000.0, temperature: 35.0, humidity: 30.0, device: device}
    weather_entry = Repo.insert!(changeset)
    conn = get conn, device_weather_entries_path(conn, :index, device.id)
    assert json_response(conn, 200) == %{"weatherEntries" => [weather_entry_json(weather_entry)]}
  end

  def weather_entry_json(weather_entry) do
    %{
      "moisture" => round(weather_entry.moisture),
      "humidity" => round(weather_entry.humidity),
      "temperature" => round(weather_entry.temperature),
      "mainVoltage" => 0,
      "secondaryVoltage" => 0,
      "createdAt" => NaiveDateTime.to_string weather_entry.inserted_at
    }
  end

end
