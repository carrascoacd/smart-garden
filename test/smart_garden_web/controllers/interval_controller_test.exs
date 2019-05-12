defmodule SmartGardenWeb.IntervalDeviceControllerTest do
  use SmartGardenWeb.ConnCase

  alias SmartGarden.Repo
  alias SmartGarden.Device
  alias SmartGarden.Interval

  setup do
    device = Repo.insert!(%Device{name: "Arduino Device"})
    {:ok, %{device: device}}
  end

  test "create interval", %{conn: conn, device: device} do
    interval_params = %{name: "water", value: 1000, action: "open-valve", execution_schedule: "* * * * *"}
    conn = post conn, device_interval_path(conn, :create, device.id), interval: interval_params
    assert json_response(conn, 201)
  end

  test "get interval", %{conn: conn, device: device} do
    changeset = %Interval{name: "water", value: 100, device: device, action: "open-valve"}
    interval = Repo.insert!(changeset)
    conn = get conn, device_interval_path(conn, :show, device.id, interval.id)
    assert json_response(conn, 200) == interval_json(interval, %{execution_schedule: nil})
  end

  test "index intervals", %{conn: conn, device: device} do
    changeset = %Interval{name: "water", value: 100, device: device, action: "polling"}
    interval = Repo.insert!(changeset)
    conn = get conn, device_interval_path(conn, :index, device.id)
    assert json_response(conn, 200) == %{"intervals" => [interval_json(interval, %{execution_schedule: nil})]}
  end

  test "update intervals", %{conn: conn, device: device} do
    execution_schedule = "* * * * 5"
    changeset = %Interval{name: "water", value: 100, device: device, action: "polling"}
    interval = Repo.insert!(changeset)
    conn = patch conn, device_interval_path(conn, :update, device.id, interval.id), 
                       interval: %{execution_schedule: execution_schedule}
    assert json_response(conn, 200) == interval_json(interval, %{execution_schedule: execution_schedule})
  end

  def interval_json(interval, %{execution_schedule: execution_schedule}) do
    execution_schedule = if execution_schedule, do: execution_schedule, else: interval.execution_schedule
    %{
      "id" => interval.id,
      "name" => interval.name,
      "value" => round(interval.value),
      "action" => interval.action,
      "execution_schedule" => execution_schedule,
      "active" => interval.active,
      "force_open" => interval.force_open
    }
  end

end
