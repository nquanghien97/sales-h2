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
            <li>Trường hợp bé nha mình lại rất <strong>phù hợp sữa Wowtop bên em giúp cho bé Phát triển chiều cao và kiểm soát tốt cân nặng.</strong></li>
            <li>Về phát triển chiều cao Sữa Wowtop chuyên biệt phát triển chiều cao từ <strong>CẤP ĐỘ NGUYÊN BÀO</strong>. Wowtop là <strong>dòng sữa nhập khẩu đầu tiên ở Việt Nam</strong> có <strong>chứa thành phần CBP, Canxi giúp phát triển chiều cao với hàm lượng cao nhất thị trường.</strong></li>
            <li>Ngoài ra giúp con kiểm soát cân nặng thì sữa <strong>sử dụng 100% đường Lactose, có chất xơ hoà tan FOS/GOS giảm hấp thu chất béo. Đặc biệt sữa có chứng nhận Non GMO không sử dụng chất biến đổi Gen giảm nguy cơ dậy thì sớm. Ở Việt Nam chỉ có 2 dòng sữa đang có chứng nhận này mẹ nhé của Peadisure và Wowtop</strong>. Mẹ hoàn toàn yên tâm nguy cơ con dậy thì sớm không cao được nữa.</li>
            <li><strong>Mẹ bổ sung con giai đoạn này là BẮT SÓNG được chiều cao của con, sau 3 tháng sử dụng là con cao bật 3-5cm. Cân nặng sẽ điều chỉnh về chuẩn, thì vóc dáng con sẽ rất đẹp mẹ ah</strong></li>
          </ul>
        )
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number, currentAge: number, gender: Gender }) => currentHeight < heightBelowStandard && currentWeight > weightBelowStandard && currentWeight < heightAboveStandard,
        title: 'Bé thấp hơn chuẩn, cân nặng đủ',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Hiện tại bé cần <strong>cải thiện chiều cao rất gấp rút</strong>. Vì chiều cao con đang thấp hơn mức trung bình, điều này cho thấy con đang có <strong>NGUY CƠ BỎ LỠ GIAI ĐOẠN VÀNG PHÁT TRIỂN CHIỂU CAO</strong>. Nhưng rất may mắn mẹ đã tìm hiểu bổ sung sữa TCC cho con đúng thời điểm rồi.</li>
            <li>Trường hợp bé nha mình lại rất phù hợp sữa Wowtop bên em. Về phát triển chiều cao Sữa Wowtop chuyên biệt phát triển chiều cao từ <strong>CẤP ĐỘ NGUYÊN BÀO. Wowtop là dòng sữa nhập khẩu đầu tiên ở Việt Nam có chứa thành phần CBP, Canxi giúp phát triển chiều cao với hàm lượng cao nhất thị trường.</strong></li>
            <li>Muốn con cao cần bổ sung dinh dưỡng đúng theo cơ chế phát triển chiều cao 2 giai đoạn <strong>XÂY KHUNG XƯƠNG, và LÀM CỨNG XƯƠNG.</strong></li>
            <li>Mẹ bổ sung con giai đoạn này là <strong>BẮT SÓNG</strong> được chiều cao của con, sau 3 tháng sử dụng là <strong>con cao bật 3-5cm. Cân nặng con mình chuẩn rồi, cao thêm 3-5cm nữa là quá đẹp mẹ ơi.</strong></li>
          </ul>
        ),
      }, 
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight < heightBelowStandard && currentWeight < weightBelowStandard,
        title: 'Bé thấp hơn chuẩn, cân nặng thiếu',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Hiện tại bé cần <strong>cải thiện cả chiều cao, cân nặng rất gấp rút, con đang thấp còi suy dinh dưỡng đó mẹ</strong>. Con đang thấp nhẹ cân hơn so trung bình, điều này cho thấy bé đang chưa được cung cấp đủ dinh dưỡng để phát triển rất có <strong>NGUY CƠ BỎ LỠ GIAI ĐOẠN VÀNG PHÁT TRIỂN CHIỂU CAO. Nhưng rất may mắn mẹ đã tìm hiểu bổ sung sữa TCC và cải thiện cân nặng cho con KỊP THỜI.</strong></li>
            <li>Trường hợp bé nha mình lại rất phù hợp sữa Wowtop bên em. Về phát triển chiều cao Sữa Wowtop chuyên biệt phát triển chiều cao từ <strong>CẤP ĐỘ NGUYÊN BÀO. Wowtop là dòng sữa nhập khẩu đầu tiên ở Việt Nam có chứa thành phần CBP, Canxi giúp phát triển chiều cao với hàm lượng cao nhất thị trường.</strong></li>
            <li>Còn về cải thiện cân nặng  giúp bé tăng cân  sữa Wowtop cung cấp đủ dinh dưỡng cho bé đủ <strong>6 nhóm chất với hơn 30 loại Vitamin và khoáng chất, ngoài ra sữa còn cải thiện hệ tiêu hoá giúp hấp thu tốt dưỡng chất nhờ công thức cải tiến tỷ lệ đạm whey gần nhất sữa mẹ, có chất béo OPO, cùng hơn 390 triệu lợi khuẩn và chất xơ hoà tan FOS/GOS.</strong></li>
            <li><strong>Mẹ bổ sung con giai đoạn này là bắt sóng được chiều cao của con, sau 3 tháng sử dụng là con cao bật 3-5cm. Cân nặng được cải thiện tắng 1-2kg trong vòng 1 tháng, vóc dáng con sẽ cao và cân đối rất đẹp chị ah. Chứ để con thấp còi vậy thiệt thòi cho bé lắm chị ah.</strong></li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight < heightAboveStandard && currentHeight > heightBelowStandard && currentWeight > weightAboveStandard,
        title: 'Bé cao chuẩn, cân nặng dư',
        content: (
          <ul className="text-lg font-semibold px-8 list-disc">
            <li>Bé có <strong>nền tảng chiều cao tốt nhưng cân nặng dư thừa</strong> có thể ảnh hưởng đến <strong>sức khỏe xương khớp</strong>, làm tăng <strong>nguy cơ dậy thì sớm và các vấn đề về chuyển hóa như kháng insulin, béo phì khi trưởng thành.</strong></li>
            <li><strong>Hiện tại tiêu chuẩn chiều cao ngày càng tăng lên, con bây giờ cao có đang đạt trung bình vài năm tới tiêu chuẩn chiều cao càng tăng lên.</strong> Mẹ <strong>tập trung chiều cao cho con ngay từ giai đoạn này là rất thông thái</strong> đó ạ, các cụ hay có câu phòng bệnh hơn chữa bệnh. Bổ sung giai đoạn này con phát triển chiều cao rất mạnh và hiệu quả, đồng tiền bỏ ra xứng đáng. </li>
            <li>Bé nhà mình <strong>cần sản phẩm để phát triển chiều cao, đồng thời kiểm soát cân nặng đó mẹ. Wowtop  là dòng sữa nhập khẩu đầu tiên ở Việt Nam có chứa thành phần CBP, Canxi giúp phát triển chiều cao với hàm lượng cao nhất thị trường.</strong></li>
            <li>Ngoài ra <strong>giúp con kiểm soát cân nặng thì sữa sửa dụng 100% đường Lactose, có chất xơ hoà tan FOS/GOS giảm hấp thu chất béo. Đặc biệt sữa có chứng nhận Non GMO không sử dụng chất biến đổi Gen giảm nguy cơ dậy thì sớm. Ở Việt Nam chỉ có 2 dòng sữa đang có chứng nhận này mẹ nhé của Peadisure và Wowtop. Mẹ hoàn toàn yên tâm nguy cơ con dậy thì sớm không cao được nữa.</strong></li>
            <li><strong>Mẹ bổ sung con giai đoạn này là bắt sóng được chiều cao của con, sau 3 tháng sử dụng là con cao bật 3-5cm. Cân nặng sẽ điều chỉnh về chuẩn, thì vóc dáng con sẽ rất đẹp mẹ ah</strong></li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight < heightAboveStandard && currentHeight > heightBelowStandard && currentWeight > weightBelowStandard && currentWeight < weightAboveStandard,
        title: 'Bé cao chuẩn, cân nặng đủ',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Trộm vía mẹ chăm con khéo quá, Bé đang <strong>phát triển khá cân đối. Bé nhà mình mới đang đạt mức trung bình mẹ nhé.</strong></li>
            <li>Tiêu chuẩn chiều cao ngày càng tăng lên, thế hệ các con sau này cao 1m7, 1m8 chị ah? Con cao lớn sau này nhiều cơ hội công việc tốt chị ah, con ngoại hình đẹp thì làm gì cũng có lợi thế hơn. Mẹ đúng là rất tâm lý quan tâm đến tương lai của con đó ạ</li>
            <li><strong>Không biết chị mong muốn con cao mét bao nhiêu chị?</strong></li>
            <li><strong>Mẹ bổ sung con giai đoạn này là bắt sóng được chiều cao của con, sau 3 tháng sử dụng là con cao bật 3-5cm</strong></li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight < heightAboveStandard && currentHeight > heightBelowStandard && currentWeight < weightBelowStandard,
        title: 'Bé cao chuẩn, cân nặng thiếu',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Bé có <strong>lợi thế về chiều cao đạt chuẩn nhưng lại thiếu cân</strong>, điều này có thể <strong>ảnh hưởng đến sức khỏe tổng thể, đề kháng yếu, dễ bị ốm vặt.</strong> Nếu không bổ sung đúng cách, <strong>bé có thể bị còi xương tiềm ẩn hoặc thiếu hụt năng lượng để tiếp tục phát triển mạnh về chiều cao.</strong></li>
            <li>Để giúp <strong>bé phát triển toàn diện, mình cần bổ sung dinh dưỡng đầy đủ, cải thiện hệ tiêu hoá giúp bé hấp thu tốt để phát triển chiều cao và cân nặng. Chứ để bé nhỏ con so với các bạn bè cũng thiệt thòi cho bé lắm chị ah.</strong></li>
            <li>Đặc biệt sữa Wowtop bên em giúp cải thiện chiều cao, cân nặng rất tốt. Các bé sử dụng sau 1 tháng cân nặng đã cải thiện 1-2kg, sau 3 tháng con cao lên 3-5cm đó chị.</li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight > heightAboveStandard && currentWeight > weightAboveStandard,
        title: 'Bé cao hơn chuẩn, cân nặng dư',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Bé nhà mình đang <strong>phát triển hơn bạn bè cùng trang lứa</strong> đó chị, Tuy nhiên đó cũng <strong>là 1 trong dấu hiệu của việc dậy thì diễn ra sớm hơn các bạn.</strong></li>
            <li>Bé đang <strong>giai đoạn phát triển chiều cao tốt</strong> vậy, thì <strong>nhu cầu dinh dưỡng cho xương nhiều hơn so với bình thường</strong> đó chị, nếu <strong>không đủ dinh dưỡng con rất dễ bị nguy cơ loãng xương</strong>. Hoặc biểu hiện nhẹ ban đầu con sẽ thấy <strong>chuột rút khi vận động hoặc đau nhức mỏi chân tay</strong>. Đồng thời mẹ <strong>cần kiểm soát cân nặng của con</strong> nha chị.</li>
            <li>Sữa Wowtop bên em giúp bé phát triển chiều cao vượt trội với từ <strong>cấp độ nguyên bào. Cũng là dòng sữa nhập khẩu đầu tiên tại Việt Nam với hàm lượng thành phần CBP, canxi hữu cơ cao nhất thị trường.</strong></li>
            <li><strong>Sữa Wowtop giúp kiểm soát cân nặng con rất tốt nhờ sử dụng 100% đường Lactose, chất xơ hoà tan giảm hấp thu chất béo.</strong></li>
            <li><strong>Đồng thời sữa bên em có chứng nhận Non-GMO không sử dụng chất biến đổi gen, tránh nguy cơ dậy thì sớm. Hiện tại ở Việt Nam chỉ có 2 dòng sữa có chứng nhận này là Peadisure và Wowtop.</strong></li>
            <li><strong>Con mình mà tận dụng bổ sung sữa giai đoạn này, con sau này cao 1m7, 1m8 thì đẹp lắm mẹ ah.</strong></li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight > heightAboveStandard && currentWeight > weightBelowStandard && currentWeight < weightAboveStandard,
        title: 'Bé cao hơn chuẩn, cân nặng đủ',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li>Bé nhà mình <strong>đang phát triển hơn bạn bè cùng trang lứa</strong> đó chị, Tuy nhiên đó cũng là <strong>1 trong dấu hiệu của việc dậy thì diễn ra sớm hơn các bạn</strong>. Mẹ cần bổ sung <strong>dinh dưỡng đầy đủ cho con vì chiều cao của con có thể chững lại sau giai đoạn dậy thì.</strong></li>
            <li>Bé đang giai đoạn <strong>phát triển chiều cao tốt vậy, thì nhu cầu dinh dưỡng cho xương nhiều hơn so với bình thường</strong> đó chị, nếu không đủ dinh dưỡng con rất dễ bị <strong>nguy cơ loãng xương. Hoặc biểu hiện nhẹ ban đầu con sẽ thấy chuột rút khi vận động hoặc đau nhức mỏi chân tay.</strong></li>
            <li>Sữa Wowtop bên em giúp bé phát triển chiều cao vượt trội với từ <strong>cấp độ nguyên bào. Cũng là dòng sữa nhập khẩu đầu tiên tại Việt Nam có chứa  thành phần CBP, canxi hữu cơ cao có hàm lượng cao nhất thị trường.</strong></li>
            <li><strong>Đồng thời Wowtop dòng sữa có chứng nhận Non GMO không sử dụng chất biến đổi gen dễ gây dậy thì sớm ở trẻ. Hiện Việt Nam chỉ có 2 dòng sữa có chứng nhận này nha mẹ, đó là Peadisure và Wowtop</strong></li>
            <li>Mẹ bổ sung cho con ngay sau này con cao 1m7, 1m8 đẹp lắm mẹ ơi.</li>
          </ul>
        ),
      },
      {
        condition: ({ currentHeight, currentWeight } : { currentHeight: number, currentWeight: number }) => currentHeight > heightAboveStandard && currentWeight < weightBelowStandard,
        title: 'Bé cao hơn chuẩn, cân nặng thiếu',
        content: (
          <ul className="text-lg font-semibold list-disc px-8">
            <li><strong>Bé có lợi thế về chiều cao hơn chuẩn nhưng lại thiếu cân, điều này có thể ảnh hưởng đến sức khỏe tổng thể, đề kháng yếu, dễ bị ốm vặt. Nếu không bổ sung đúng cách, bé có thể bị còi xương tiềm ẩn hoặc thiếu hụt năng lượng để tiếp tục phát triển mạnh về chiều cao.</strong></li>
            <li><strong>Để giúp bé phát triển toàn diện, mình cần bổ sung dinh dưỡng đầy đủ, cải thiện hệ tiêu hoá giúp bé hấp thu tốt để phát triển chiều cao và cân nặng. Chiều cao và cân nặng cân đối vóc dáng của con sẽ đẹp hơn.</strong></li>
            <li>Về phát triển chiều cao <strong>Sữa Wowtop chuyên biệt phát triển chiều cao từ CẤP ĐỘ NGUYÊN BÀO.  Wowtop  là dòng sữa nhập khẩu đầu tiên ở Việt Nam có chứa thành phần CBP, Canxi giúp phát triển chiều cao với hàm lượng cao nhất thị trường.</strong></li>
            <li>Còn về cải thiện cân nặng  giúp bé tăng cân  sữa Wowtop cung cấp đủ dinh dưỡng cho bé <strong>đủ 6 nhóm chất với hơn 30 loại Vitamin và khoáng chất, ngoài ra sữa còn cải thiện hệ tiêu hoá giúp hấp thu tốt dưỡng chất nhờ công thức cải tiến tỷ lệ đạm whey gần nhất sữa mẹ, có chất béo OPO, cùng hơn 390 triệu lợi khuẩn và chất xơ hoà tan FOS/GOS.</strong></li>
            <li><strong>Các bé sử dụng sau 1 tháng cân nặng đã cải thiện 1-2kg, sau 3 tháng con cao lên 3-5cm đó chị.</strong></li>
          </ul>
        ),
      }
    ]
  )
}