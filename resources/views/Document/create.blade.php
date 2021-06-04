@extends('layouts.app')

@section('content') 
    <!--CSS-->
    <link href="{{ asset('css/Mentor/Document/create.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <div><a href="/mentor">管理ページ</a> > 記事新規登録</div>
        <form action="/documents/store" method="post">
            @csrf
            <div class="content">
                <h2 class="title">記事のタイトルを入力してください。</h2>
                <textarea name="post[title]" placeholder="制限字数は５０文字です"></textarea>
                <p class="title__error" style="color:red">{{ $errors->first('post.title') }}</p>
            </div>
            <div class="content">
                <h2 class="title">記事のリンクを入力してください。</h2>
                <textarea name="post[link]" placeholder="URLを入力"></textarea>
                <p class="link__error" style="color:red">{{ $errors->first('post.link') }}</p>
            </div>
            <div class="submit">
                <button type="submit">登録する</button>
            </div>
        </form>
    </div>
@endsection
