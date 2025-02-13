export enum Gender {
  BOY = "BOY",
  GIRL = 'GIRL'
}

export const data_config = ({ heightBelowStandard, heightAboveStandard, weightBelowStandard, weightAboveStandard } : { heightBelowStandard: number, heightAboveStandard: number, weightBelowStandard: number, weightAboveStandard: number }) => {
  return (
    [
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number, currentAge: number, gender: Gender }) => currentHeight < heightBelowStandard && currentWeight > weightAboveStandard,
        title: 'Bé thấp hơn chuẩn, cân nặng dư',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Hiện tại <strong>bé cần cải thiện chiều cao rất gấp rút, đồng thời kiểm soát cân nặng</strong> chị nhé. Vì chiều cao con đang thấp, cân nặng dư sẽ ảnh hưởng đến sự phát triển chiều cao con trong tương lai. Đặc biệt dư cân dễ gây dậy thì sớm con sẽ không cao được nữa. Mà hiện tại các bé ngày càng dậy thì sớm hơn thế hệ chị em mình chị ah.</li>
            <li>Trường hợp bé nha mình lại rất phù hợp sữa Wowtop bên em. Sữa Wowtop chuyên biệt phát triển chiều cao từ cấp nguyên bào với thành phần CBP cao và cũng là dòng sữa đầu tiên tại nhập khẩu hiện tại ở Việt Nam có chứa CBP, Canxi với hàm lượng cao nhất.</li>
            <li>Ngoài ra giúp con kiểm soát cân năng thì sữa sửa dụng 100% đường Lactose, có chất xơ  FOS/GOS giảm hấp thu chất béo. Đặc biệt tránh nguy cơ dậy thì sớm làm khoá đầu xương của con sũa có chứng nhận Non GMO không sử dụng chất biến đổi Gen, Mẹ hoàn toàn yên tâm nguy cơ con dậy thì sớm không cao được nữa.</li>
            <li>Mẹ bổ sung con giai đoạn này Vàng/Tiền dậy thì/Dậy thì này là bắt sóng được chiều cao của con, sau 3 tháng sử dụng là con cao bật 3-5cm. Cân nặng sẽ điều chỉnh về chuẩn, thì vóc dáng con sẽ rất đẹp mẹ ah</li>
          </ul>
        )
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number, currentAge: number, gender: Gender }) => currentHeight < heightBelowStandard && currentWeight > weightBelowStandard && currentWeight < heightAboveStandard,
        title: 'Bé thấp hơn chuẩn, cân nặng đủ',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Hiện tại bé cần cải thiện <strong>chiều cao rất gấp rút</strong>. Vì chiều cao con đang thấp hơn mức trung bình, điều này cho thấy bé có <strong>NGUY CƠ BỎ LỠ GIAI ĐOẠN VÀNG PHÁT TRIỂN CHIỂU CAO</strong>. Nhưng rất may mắn mẹ đã tìm hiểu bổ sung sữa TCC cho con đúng thời điểm rồi.</li>
            <li>Trường hợp bé nha mình lại rất phù hợp sữa Wowtop bên em. Sữa Wowtop chuyên biệt phát triển chiều cao từ cấp nguyên bào với thành phần CBP cao và cũng là dòng sữa đầu tiên tại nhập khẩu hiện tại ở Việt Nam có chứa CBP, Canxi với hàm lượng cao nhất. Muốn con cao cần bổ sung dinh dưỡng đúng theo cơ chế phát triển chiều cao 2 giai đoạn XÂY KHUNG XƯƠNG, và LÀM CỨNG XƯƠNG.</li>
            <li>Mẹ bổ sung con giai đoạn này Vàng/Tiền dậy thì/Dậy thì này là bắt sóng được chiều cao của con, sau 3 tháng sử dụng là con cao bật 3-5cm.</li>
          </ul>
        ),
      }, 
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight < heightBelowStandard && currentWeight < weightBelowStandard,
        title: 'Bé thấp hơn chuẩn, cân nặng thiếu',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Hiện tại bé cần cải thiện cải chiều cao, cân nặng rất gấp rút. Con đang thấp nhẹ cân hơn so trung bình, điều này cho thấy bé đang chưa được cung cấp đủ dinh dưỡng để phát triển rất có NGUY CƠ BỎ LỠ GIAI ĐOẠN VÀNG PHÁT TRIỂN CHIỂU CAO. Nhưng rất may mắn mẹ đã tìm hiểu bổ sung sữa TCC cho con đúng thời điểm rồi.</li>
            <li>Trường hợp bé nha mình lại rất phù hợp sữa Wowtop bên em. Sữa Wowtop chuyên biệt phát triển chiều cao từ cấp nguyên bào với thành phần CBP cao và cũng là dòng sữa đầu tiên tại nhập khẩu hiện tại ở Việt Nam có chứa CBP, Canxi với hàm lượng cao nhất.</li>
            <li>Còn về cân nặng của bé sữa Wowtop cung cấp đủ dinh dưỡng cho bé đủ 6 nhóm chất với hơn 30 loại Vitamin và khoáng chất, ngoài ra sữa còn cải thiện hệ tiêu hoá giúp hấp thu tốt dưỡng chất nhờ công thức cải tiến tỷ lệ đạm whey gần nhất sữa mẹ, có chất béo OPO, cùng hơn 390 triệu lợi khuẩn và chất xơ hoà tan FOS/GOS.</li>
            <li>Mẹ bổ sung con giai đoạn này Vàng/Tiền dậy thì/Dậy thì này là bắt sóng được chiều cao của con, sau 3 tháng sử dụng là con cao bật 3-5cm. Cân nặng được cải thiện, vóc dáng con sẽ cao và cân đối rất đẹp chị ah.</li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight < heightAboveStandard && currentHeight > heightBelowStandard && currentWeight > weightAboveStandard,
        title: 'Bé cao chuẩn, cân nặng dư',
        content: (
          <ul className="text-lg font-semibold list-disc px-8 list-disc">
            <li>Bé có nền tảng chiều cao tốt nhưng cân nặng dư thừa có thể ảnh hưởng đến sức khỏe xương khớp, làm tăng nguy cơ dậy thì sớm và các vấn đề về chuyển hóa như kháng insulin, béo phì khi trưởng thành.</li>
            <li>Hiện tại tiêu chuẩn chiều cao ngày càng tăng lên, dù con bây giờ cao có đang đạt trung bình nhưng để con cao lớn hơn thì mẹ bổ sung giai đoạn này là rất chuẩn đó ạ.</li>
            <li>Bé nhà mình cần sản phẩm để phát triển chiều cao, đồng thời kiểm soát cân nặng đó mẹ. Sữa Wowtop bên em giúp hỗ trợ phát triển chiều cao từ cấp nguyên bào xương với thành phần CBP cao và cũng là dòng sữa đầu tiên tại nhập khẩu hiện tại ở Việt Nam có chứa CBP, Canxi với hàm lượng cao nhất.</li>
            <li>Ngoài ra giúp con kiểm soát cân năng thì sữa sửa dụng 100% đường Lactose, có chất xơ  FOS/GOS giảm hấp thu chất béo. Đặc biệt tránh nguy cơ dậy thì sớm làm khoá đầu xương của con sũa có chứng nhận Non GMO không sử dụng chất biến đổi Gen, Mẹ hoàn toàn yên tâm nguy cơ con dậy thì sớm không cao được nữa.</li>
            <li>Mẹ bổ sung con giai đoạn này Vàng/Tiền dậy thì/Dậy thì này là bắt sóng được chiều cao của con, sau 3 tháng sử dụng là con cao bật 3-5cm. Cân nặng sẽ điều chỉnh về chuẩn, thì vóc dáng con sẽ rất đẹp mẹ ah</li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight < heightAboveStandard && currentHeight > heightBelowStandard && currentWeight > weightBelowStandard && currentWeight < weightAboveStandard,
        title: 'Bé cao chuẩn, cân nặng đủ',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Trộm vía mẹ chăm con khéo quá, Bé đang phát triển khá cân đối, tuy nhiên không có nghĩa là không cần bổ sung dinh dưỡng để tối ưu chiều cao trong giai đoạn vàng. Tiêu chuẩn chiều cao ngày càng tăng lên, thế hệ các con sau này cao 1m7, 1m8 chị ah? Con cao lớn sau này nhiều cơ hội công việc tốt chị ah, con ngoại hình đẹp thì làm gì cũng có lợi thế hơn. Mẹ đúng là rất tâm lý quan tâm đến tương lai của con đó ạ</li>
            <li>Không biết chị mong muốn con cao mét bao nhiêu chị?</li>
            <li>Mẹ bổ sung con giai đoạn này Vàng/Tiền dậy thì/Dậy thì này là bắt sóng được chiều cao của con, sau 3 tháng sử dụng là con cao bật 3-5cm</li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight < heightAboveStandard && currentHeight > heightBelowStandard && currentWeight < weightBelowStandard,
        title: 'Bé cao chuẩn, cân nặng thiếu',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Bé có lợi thế về chiều cao đạt chuẩn nhưng lại thiếu cân, điều này có thể ảnh hưởng đến sức khỏe tổng thể, đề kháng yếu, dễ bị ốm vặt. Nếu không bổ sung đúng cách, bé có thể bị còi xương tiềm ẩn hoặc thiếu hụt năng lượng để tiếp tục phát triển mạnh về chiều cao.</li>
            <li>Để giúp bé phát triển toàn diện, mình cần bổ sung dinh dưỡng đầy đủ, cải thiện hệ tiêu hoá giúp bé hấp thu tốt để phát triển chiều cao và cân nặng. Chứ để bé nhỏ con so với các bạn bè cũng thiệt thòi cho bé lắm chị ah.</li>
            <li>Đặc biệt sữa Wowtop bên em giúp cải thiện chiều cao, cân nặng rất tốt. Các bé sử dụng sau 1 tháng cân nặng đã cải thiện 1-2kg, sau 3 tháng con cao lên 3-5cm đó chị.</li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight > heightAboveStandard && currentWeight > weightAboveStandard,
        title: 'Bé cao hơn chuẩn, cân nặng dư',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Bé nhà mình đang phát triển hơn bạn bè cùng trang lứa đó chị, Tuy nhiên đó cũng là 1 trong dấu hiệu của việc dậy thì diễn ra sớm hơn các bạn.</li>
            <li>Chiều cao bé nhà mình cao rất tốt rồi mẹ, về cân nặng con lại đang dư cân khá nhiều chị ah.</li>
            <li>Bé đang giai đoạn phát triển chiều cao tốt vậy, thì nhu cầu dinh dưỡng cho xương nhiều hơn so với bình thường đó chị, nếu không đủ dinh dưỡng con rất dễ bị nguy cơ loãng xương. Hoặc biểu hiện nhẹ ban đầu con sẽ thấy chuột rút khi vận động hoặc đau nhức mỏi chân tay. Đồng thời mẹ cần kiểm soát cân nặng của con nha chị.</li>
            <li>Sữa Wowtop bên em giúp bé phát triển chiều cao vượt trội với từ cấp nguyên bào xương với hàm lượng thành phần CBP. canxi hữu cơ cao nhất thị trường.  Sưa Wowtop giúp kiểm soát cân nặng con rất tốt nhờ sử dụng 100% đường Lactose, chất xơ hoà tan giảm hấp thu chất béo. Con sử dụng sau 1 tháng chị thấy vóc dáng con cân đối hơn. con đã cao, cân nặng chuẩn nữa thì đúng chuẩn người mẫu rồi mẹ.</li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight > heightAboveStandard && currentWeight > weightBelowStandard && currentWeight < weightAboveStandard,
        title: 'Bé cao hơn chuẩn, cân nặng đủ',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Bé nhà mình đang phát triển hơn bạn bè cùng trang lứa đó chị, Tuy nhiên đó cũng là 1 trong dấu hiệu của việc dậy thì diễn ra sớm hơn các bạn. Mẹ cần bổ sung dinh dưỡng đầy đủ cho con vì chiều cao của con có thể chững lại sau giai đoạn dậy thì.</li>
            <li>Bé đang giai đoạn phát triển chiều cao tốt vậy, thì nhu cầu dinh dưỡng cho xương nhiều hơn so với bình thường đó chị, nếu không đủ dinh dưỡng con rất dễ bị nguy cơ loãng xương. Hoặc biểu hiện nhẹ ban đầu con sẽ thấy chuột rút khi vận động hoặc đau nhức mỏi chân tay</li>
            <li>Sữa Wowtop bên em giúp bé phát triển chiều cao vượt trội với từ cấp nguyên bào xương với hàm lượng thành phần CBP. canxi hữu cơ cao nhất thị trường. Đồng thời Wowtop dòng sữa có chứng nhận Non GMO không sử dụng chất biến đổi gen dễ gây dậy thì sớm ở trẻ.</li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight > heightAboveStandard && currentWeight < weightBelowStandard,
        title: 'Bé cao hơn chuẩn, cân nặng thiếu',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Bé có lợi thế về chiều cao hơn chuẩn nhưng lại thiếu cân, điều này có thể ảnh hưởng đến sức khỏe tổng thể, đề kháng yếu, dễ bị ốm vặt. Nếu không bổ sung đúng cách, bé có thể bị còi xương tiềm ẩn hoặc thiếu hụt năng lượng để tiếp tục phát triển mạnh về chiều cao.</li>
            <li>Để giúp bé phát triển toàn diện, mình cần bổ sung dinh dưỡng đầy đủ, cải thiện hệ tiêu hoá giúp bé hấp thu tốt để phát triển chiều cao và cân nặng. Chiều cao và cân nặng cân đối vóc dáng của con sẽ đẹp hơn.</li>
            <li>Đặc biệt sữa Wowtop bên em giúp cải thiện chiều cao, cân nặng rất tốt. Các bé sử dụng sau 1 tháng cân nặng đã cải thiện 1-2kg, sau 3 tháng con cao lên 3-5cm đó chị.</li>
          </ul>
        ),
      }
    ]
  )
}