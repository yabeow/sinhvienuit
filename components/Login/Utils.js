import { betweenTwoSubString } from '../../utils';
//Lấy form_build_id từ trang đăng nhập DAA.
export function parseDaaFormBuildId(html) {
    let form_build_id = betweenTwoSubString(html, "<h2>Đăng Nhập</h2>", "user_login_block");
    form_build_id     = betweenTwoSubString(form_build_id, 'name="form_build_id" value="', '"');
    if (form_build_id) {
        return form_build_id;
    }
    else {
        return false;
    }
}
//Lấy form_build_id từ trang đăng nhập OEP.
export function parseOepFormBuildId(html) {
    let form_build_id = betweenTwoSubString(html, 'block-user-login', "user_login_block");
    form_build_id     = betweenTwoSubString(form_build_id, 'name="form_build_id" value="', '"');
    if (form_build_id) {
        return form_build_id;
    }
    else {
        return false;
    }
}
//Lấy form_build_id từ trang đăng nhập DRL.
export function parseDrlFormBuildId(html) {
    let form_build_id = betweenTwoSubString(html, 'user-login', "user_login");
    form_build_id     = betweenTwoSubString(form_build_id, 'name="form_build_id" value="', '"');
    if (form_build_id) {
        return form_build_id;
    }
    else {
        return false;
    }
}
//Kiểm tra html xem đã đăng nhập hay chưa.
export function checkLoggedIn(html) {
    return !(html.contains("Đăng Nhập") || html.contains('Đăng nhập') || html.contains("Truy cập bị từ chối"));
}