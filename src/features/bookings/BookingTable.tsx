import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
// import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookingList } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading } = useBookingList();

  if (isLoading) return <Spinner />;

  if (!bookings?.count) return <Empty resourceName="bookings" />;

  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings.data}
        render={(booking: any) => (
          <BookingRow key={booking.id} booking={booking} />
        )}
      />

      <Table.Footer>
        <Pagination count={bookings.count} />
      </Table.Footer>
    </Table>
  );
}

export default BookingTable;
