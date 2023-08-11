// sagas.ts

import { all } from 'redux-saga/effects';
import { theoDoiDangNhapSaga } from './quanLyNguoiDung';

export default function* rootSaga() {
    yield all([theoDoiDangNhapSaga()]);
}
