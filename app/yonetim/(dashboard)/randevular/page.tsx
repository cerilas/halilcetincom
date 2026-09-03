import { getAppointments, getAppointmentSettings } from "../../actions";
import { AppointmentsView } from "./appointments-view";

export default async function RandevularPage() {
  const appointments = await getAppointments();
  const settings = await getAppointmentSettings();

  return <AppointmentsView initialAppointments={appointments} settings={settings} />;
}
