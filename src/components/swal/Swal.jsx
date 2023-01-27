import React from 'react';
import swal from "sweetalert";

const Swal = () => {
        swal({
            text: "현재 비밀번호를 입력해주세요",
            button: "돌아가기",
          });
};

export default Swal;