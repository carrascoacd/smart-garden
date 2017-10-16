defmodule SmartGarden.Device do
  use Ecto.Schema

  schema "devices" do
    field :name, :string
  end
end