//宣告react components
import React, { Component } from 'react';
import { updateFocus } from 'react-navigation-is-focused-hoc'
import codePush from "react-native-code-push";

//import 原生 UI元素
import {
  AppRegistry,
    Image,
    StyleSheet
} from 'react-native';

//import 導航
import { TabNavigator,StackNavigator } from 'react-navigation';

import GlobalStyle from './app/Styles/Global_Style';

//import 頁面
import LoginPage from './app/components/Login';
import RegisterPage from './app/components/Register';
import FirstLoginPage from './app/components/FirstLoginPage'

//通知頁面
import Bell from './app/components/Bell/Bell';
import BellDetail from './app/components/Bell/BellDetail';
//卡友
import Card from './app/components/Card/Card';
import MyCard from './app/components/Card/MyCard';
//好友,聊天
import Friends from './app/components/Friends/Friends';
import SingleChatRoom from './app/components/Friends/SingleChatRoom';
import FriendProfile from './app/components/Friends/FriendProfile';
//附近的人
import NearBy from './app/components/NearBy/NearBy';
//設定頁面
import Setting from './app/components/Setting/Setting';
import UseTeach from './app/components/Setting/SettingList/Introduce/UseTeach';
import TkuHome from './app/components/Setting/TkuILife/TkuHome';
import ClassSchedule from './app/components/Setting/TkuILife/ClassSchedule';
import ScoreSchedule from './app/components/Setting/TkuILife/ScoreSchedule';
import TestSchedule from './app/components/Setting/TkuILife/TestSchedule';
import LiveHome from './app/components/Setting/TkuILife/LiveList/LiveHome';
import LibraryHome from './app/components/Setting/TkuILife/LibraryList/LibraryHome';
import LiveView from './app/components/Setting/TkuILife/LiveList/LiveVIew/LiveView';
import LiveViewList from './app/components/Setting/TkuILife/LiveList/LiveVIew/LiveViewList';
import BusStatus from './app/components/Setting/TkuILife/LiveList/BusStatus/BusStatus';
import SingleBus from './app/components/Setting/TkuILife/LiveList/BusStatus/SingleBus';
import ComputerRoom from './app/components/Setting/TkuILife/LiveList/ComputerRoom/ComputerRoom';
import Weather from './app/components/Setting/TkuILife/LiveList/TamshuiWeather/Weather';
import AboutApp from './app/components/Setting/SettingList/Introduce/AboutApp';
import AboutDevelop from './app/components/Setting/SettingList/Introduce/AboutDevelop';
import NewStudent from './app/components/Setting/SettingList/Introduce/NewStudent';
import Report from './app/components/Setting/SettingList/Interactive/Report';
import ReportUser from './app/components/Setting/SettingList/Interactive/ReportUser';
import AdviceFeature from './app/components/Setting/SettingList/Interactive/AdviceFeature';
import CareerJoin from './app/components/Setting/SettingList/Interactive/CareerJoin';


///測試用的頁面
import TestPage from './app/Test/TestPage';
import TestPage2 from './app/Test/TestPage2';

const TabView = TabNavigator(
    {
        Friends: {
            screen: Friends ,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: 'white',
                    height: 60,
                },
                headerTitle: '好友列表',
                headerTitleStyle: {
                    color: GlobalStyle.mainColor
                },
                tabBarLabel: '好友',
                tabBarIcon: ({ tintColor }) =>(
                    <Image
                        source={require('./app/img/ic_chat_2x.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
                ),
            }
        },
        NearBy: {
            screen: NearBy,
            navigationOptions: {
                headerTitle: '附近的人',
                headerStyle: {
                    backgroundColor: 'white',
                    height: 60,
                },
                headerTitleStyle: {
                    color: GlobalStyle.mainColor
                },
                tabBarLabel: '搜尋附近',
                tabBarIcon: ({ tintColor }) =>(
                    <Image
                        source={require('./app/img/ic_place_2x.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
                ),
            }
        },
        Card: {
            screen: Card,
            navigationOptions: {
                tabBarLabel: '新朋友',
                tabBarIcon: ({ tintColor }) =>(
                    <Image
                        source={require('./app/img/ic_star_2x.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
                ),
                headerTitle: '今天的新卡友',
                headerStyle: {
                    backgroundColor: 'white',
                    height: 60,
                },
                headerTitleStyle: {
                    color: GlobalStyle.mainColor
                },
            }
        },
        Bell: {
            screen: Bell,
            navigationOptions: {
                tabBarLabel: '通知',
                tabBarIcon: ({ tintColor }) =>(
                    <Image
                        source={require('./app/img/ic_public_2x.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
                ),
                headerTitle: '通知列表',
                headerStyle: {
                    backgroundColor: 'white',
                    height: 60,
                },
                headerTitleStyle: {
                    color: GlobalStyle.mainColor
                },
            }
        },
        Setting: {
            screen: Setting,
            navigationOptions: {
                tabBarLabel: '其他',
                tabBarIcon: ({ tintColor }) =>(
                    <Image
                        source={require('./app/img/ic_menu_2x.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
                ),
                headerTitle: '設定頁面',
                headerStyle: {
                    backgroundColor: 'white',
                    height: 60,
                },
                headerTitleStyle: {
                    color: GlobalStyle.mainColor
                },
            }
        },
    },
    {
        tabBarOptions : {
            activeTintColor: GlobalStyle.mainColor,
            style: {
                backgroundColor: 'white',
            }
        }
    }
);

const StackView = StackNavigator({
    Home: { screen: TabView },
    SingleChatRoom: {
        screen: SingleChatRoom,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    MyCard: {
        screen: MyCard,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    TkuHome: {
        screen: TkuHome,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    ClassSchedule: {
        screen: ClassSchedule,
        navigationOptions: {
            headerTitle: '我的課表',
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    ScoreSchedule: {
        screen: ScoreSchedule,
        navigationOptions: {
            headerTitle: '期中期末成',
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    TestSchedule: {
        screen: TestSchedule,
        navigationOptions: {
            headerTitle: '考試小表',
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    LiveHome: {
        screen: LiveHome,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    LibraryHome: {
        screen: LibraryHome,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    LiveView: {
        screen: LiveView,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    LiveViewList: {
        screen: LiveViewList,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    BusStatus: {
        screen: BusStatus,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '公車動態',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    SingleBus: {
        screen: SingleBus,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            // headerTitle: '公車動態',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    ComputerRoom: {
        screen: ComputerRoom,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '實習室機位',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    Weather: {
        screen: Weather,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '淡水天氣',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    BellDetail: {
        screen: BellDetail,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '通知細節',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    FriendProfile: {
        screen: FriendProfile,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '好友資料',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    AboutApp: {
        screen: AboutApp,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '關於此App',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    AboutDevelop: {
        screen: AboutDevelop,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '關於開發者',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    UseTeach: {
        screen: UseTeach,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '使用教學',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    NewStudent: {
        screen: NewStudent,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '新生專區',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    Report: {
        screen: Report,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '問題回報',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    ReportUser: {
        screen: ReportUser,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '檢舉不良使用者',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    AdviceFeature: {
        screen: AdviceFeature,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '推薦功能',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
    CareerJoin: {
        screen: CareerJoin,
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
                height: 60,
            },
            headerTitle: '加入開發團隊',
            headerTitleStyle: {
                color: GlobalStyle.mainColor
            },
        }
    },
});


const App = StackNavigator({
    Main: {
        screen: LoginPage,
        navigationOptions: {
            header: null
        }
    },

    RegisterPage: {
        screen: RegisterPage,
        navigationOptions: {
            header: null
        }
    },
    HomePage: {
        screen: StackView,
        navigationOptions: {
            header: null
        }
    },
    FirstLoginPage: {
        screen: FirstLoginPage,
        navigationOptions: {
            header: null
        }
    },
    TestPage: {
        screen: TestPage,
        navigationOptions: {
            header: null
        }
    },
    TestPage2: {
        screen: TestPage2,
        navigationOptions: {
            header: null
        }
    }
});




export default class nativePractice_serious extends Component {
  render() {
    return (
        <App
            onNavigationStateChange={(prevState, currentState) => {
                updateFocus(currentState)
            }}
        />
    );
  }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});

AppRegistry.registerComponent('nativePractice_serious', () => nativePractice_serious);

nativePractice_serious = codePush(nativePractice_serious);