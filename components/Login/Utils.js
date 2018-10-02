import { betweenTwoSubString } from '../../utils';

// Lấy form_build_id từ trang đăng nhập DAA.
export function parseDaaFormBuildId(html) {
  let formBuildId = betweenTwoSubString(html, '<h2>Đăng Nhập</h2>', 'user_login_block');
  formBuildId = betweenTwoSubString(formBuildId, 'name="form_build_id" value="', '"');
  if (formBuildId) {
    return formBuildId;
  }
  return false;
}

// Lấy form_build_id từ trang đăng nhập OEP.
export function parseOepFormBuildId(html) {
  let formBuildId = betweenTwoSubString(html, 'block-user-login', 'user_login_block');
  formBuildId = betweenTwoSubString(formBuildId, 'name="form_build_id" value="', '"');
  if (formBuildId) {
    return formBuildId;
  }
  return false;
}

// Lấy form_build_id từ trang đăng nhập DRL.
export function parseDrlFormBuildId(html) {
  let formBuildId = betweenTwoSubString(html, 'user-login', 'user_login');
  formBuildId = betweenTwoSubString(formBuildId, 'name="form_build_id" value="', '"');
  if (formBuildId) {
    return formBuildId;
  }
  return false;
}

// Kiểm tra html xem đã đăng nhập hay chưa.
export function checkLoggedIn(html) {
  return !(
    html.includes('Đăng Nhập') ||
    html.includes('Đăng nhập') ||
    html.includes('Truy cập bị từ chối') ||
    html.includes('are not logged in')
  );
}
