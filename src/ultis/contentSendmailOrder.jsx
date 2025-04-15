export const subject = "[Thông báo] Đặt hàng thành công";
export const contentEmail = (orderId) => `<h2>Chào bạn,</h2>
<p>Đơn hàng của bạn đã được đặt thành công.</p>
<p>Thông tin đơn hàng:</p>
<ul>
  <li>Mã đơn hàng: <span style="color:blue">${orderId}</span></li>
</ul>
<p style="color:red">Vui lòng không chia sẽ mã đơn hàng với bất kỳ ai.</p>
<p>Truy cập trang chủ để có thể tra cứu đơn hàng của bạn.</p>
<p>Cảm ơn bạn đã đặt hàng tại ComputerWorld.</p>
<p>Trân trọng,</p>`;
