import { Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useUser } from '../state/swr/useUser';

const NavList = {
  '': '메인 화면',
  seller: {
    root: '판매자',
    CreateShop: '가게 생성',
    MyShop: '가게 정보',
    Scan: '스캔',
  },
  customer: {
    root: '구매자',
    SearchShop: '가게 검색',
    Profile: '개인 정보',
  },
  Login: '로그인',
};

const DefaultLayout: FC = ({ children }) => {
  const router = useRouter();
  const pathList = router.pathname.slice(1).split('/');
  const { data: userData, error } = useUser();

  if (userData && !error) {
    // NavList['Logout'] = '로그아웃'
  }

  const push = (url: string) => {
    router.push(url);
  };

  const Nav = () => {
    return (
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={pathList}>
        {Object.entries(NavList).map(([key, value]) => {
          if (typeof value == 'string') {
            // 단일 메뉴일 경우
            return (
              <Menu.Item key={key} onClick={() => push(`/${key}`)}>
                {value}
              </Menu.Item>
            );
          } else {
            // 서브 메뉴가 있는 경우
            return (
              <SubMenu key={key} title={value.root}>
                {Object.entries(value).map(([subKey, subName]) => {
                  if (subKey != 'root') {
                    return (
                      <Menu.Item
                        key={subKey}
                        onClick={() => push(`/${key}/${subKey}`)}
                      >
                        {subName}
                      </Menu.Item>
                    );
                  }
                })}
              </SubMenu>
            );
          }
        })}
      </Menu>
    );
  };

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Nav />
        <div style={{ color: 'white' }}>{userData?.email}</div>
      </Header>
      <Layout>{children}</Layout>
    </Layout>
  );
};

export default DefaultLayout;
