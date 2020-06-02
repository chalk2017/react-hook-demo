#### react-hook cli 说明
##### hook简介
1. 什么是hook？
hook是react最新的框架，是作为react的简化。它是react的功能延申，简单的说，就是以一种新的写法来编写react，但项目中也可以用旧的方式写。而hook是钩子的含义，react意为通过不同的钩子函数来简化大部分操作。
2. 函数组件
react hook这次抛弃了class组件方式，返璞归真回归到了函数组件。
下面通过两个例子做一下对比：
```
//这是class组件
class DemoComponent extends React.Component {
    public xxx(){
        return <div>xxx</div>
    }
    public render(){
        return this.xxx()
    }
}
```
(1)class组件我们可以引用this指针，我们可以使用this中的一切方法，包括视图渲染、props等；
(2)class有生命周期函数，比如说在组件挂载的时候获取数据等等；
(3)class中可以定义一些共有/私有变量，这些变量的值不会因组件的渲染被清空或初始化。
```
//这是函数组件
const Layout: React.FC = (props: any) => {
    const xxx = <div>xxx</div>
    return xxx;
}
```
(1)函数组件因为是只有一个函数，无法通过this指针找到当前的react对象。
(2)没有生命周期。
(3)函数在每次执行的时候，其内部变量都会被重新定义，并初始化。
(4)函数组件操作和编写都比较简单，没有上述三点，也就不需要考虑上述三点内容了，因为是函数，因此组件之间的传参就可以通过函数的参数获取。把一切都简单化了。
(5)由于上三点无法实现，由此hook加入了一些钩子函数，来补充上三点缺失的部分，但不是全部，只是一些常用的功能可以通过hook直接操作。
##### 都有哪些hook？
以下是列举出的一些常用的hook函数
1. 状态钩子：useState(init_value)
```
const [open,setOpen] = useState(false)
if(open){
    setOpen(true)
}
```
看上面的代码，useState()可以解构出一个二维数组，第一个是要设置的状态值，第二个是设置该值的方法。而括号里的是初始值。了解redux的都知道，在redux中state被称作快照，最终流入store中，也就意味着每次的state都是一个新的state，即便是新定义的state，也不会影响到上一个state的值，简单说就是单向数据流。这里与之相同的就是open就是hook中自定义的state变量，而open的值取的就是上一个state的值，所以每次函数即使重新执行，open重新被定义，但通过useState函数获取到上一个state值，就能把open的这个变量的值永久保持下来。useState函数也是一个自带渲染的钩子，即每次open变化当前的函数组件会重新执行，来重新渲染当前的组件。
2. 动作钩子：useReducer(reducer,init_value)
```
const AppReducer = (state:any, action:any) => {
    let init_state = {};
    console.log(state,action);
    return action || init_state;
}
const [open,setOpen] = useReducer(AppReducer,false)
if(open){
    setOpen(true)
}
```
根据上面的代码，对比useState，只是多了一个AppReducer，在redux中reducer是一个纯函数，在这里也是一样的。这么看来useReducer就是高阶版的useState，而useState原理上也是通过useReducer封装的。useReducer多出来的reducer可以做为拦截器，可以在每次给数据赋值的时候做一些处理。
上面的代码，通过下面这么表示可能就清楚了，因为它符合redux的思想。
```
const [state,action] = useReducer(reducer,init_state)
```
3. 全局状态钩子：useContext(AppContext)
useContext可以单独创建，但如果实现全局共享状态的数据传输，一般要和useReducer一起用。
例子可以参照App.tsx、store/context.ts、store/reducer.ts、frameword/Layout.tsx、login/index.tsx。
全局钩子其实就是redux的实现。
##### 以下是我对react-router-dom的一些理解
要构建一套路由系统我们一般如下方式：
```
import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
const App: React.FC = (props: any) => {
  const contextValue = React.useReducer(AppReducer, {});
  return (
      <BrowserRouter>
        <Route render={({ location }) => {
            return (
                <Switch key={location.pathname}>
                    <Route location={location} exact={true} path="/login" component={Login} />
                    <Route location={location} exact={true} path="/home" component={Home} />
                </Switch>
            )
        }} />
      </BrowserRouter>
  );
}
```
但此时，我们有个框架的组件，这个组件包括导航菜单，我们想通过导航菜单来实现路由跳转，但这个导航菜单的组件我们要挂在哪层里呢？
一开始的方案我是这么做的：（这只是上面代码的一部分节选）
```
<BrowserRouter>
    <Route render={({ location }) => {
        return (
            <Switch key={location.pathname}>
                <Layout>
                    <Route location={location} exact={true} path="/login" component={Login} />
                    <Route location={location} exact={true} path="/home" component={Home} />
                </Layout>
            </Switch>
        )
    }} />
</BrowserRouter>
```
Layout就是框架的菜单，我们可以通过props.children获取路由挂在的子节点。但这么做有个缺点，每次的路由都会重新构建Layout，即/login构建的Layout和/home构建的Layout是两个组件，虽然看上去是一样的，而useState只能保存当前组件的状态，所以说对于这种写法useState就失效了，当然useReducer也是一样的。
那么，就有了下面这种写法来解决这个问题：
```
<BrowserRouter>
    <Layout>
        <Route render={({ location }) => {
            return (
                <Switch key={location.pathname}>
                    <Route location={location} exact={true} path="/login" component={Login} />
                    <Route location={location} exact={true} path="/home" component={Home} />
                </Switch>
            )
        }} />
    </Layout>
</BrowserRouter>
```
这种写法也比较符合人的思维模式，当我们通过框架页面的菜单去切换路由，就应该把路由嵌在框架页面里，而不应该把框架路由嵌在路由里。（如果不用hook这个问题就比较好解决了）