<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
        <title>Card Customization</title>

        <!-- Fonts -->
        <!-- <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css"> -->

        <!-- Styles -->
        <style>
    .card-img-top{
        width:100%;
        height:60vh;
    }
    
#head{
    background-color:cornflowerblue;
    text-align: center;
    padding: 5%;
    color: aliceblue;

}
#body{
    text-align: center;
    padding-top: 3.5%;
    font-size: 120%;

}
#card{
    text-align: center;
    padding-left: 6%;
}

</style>
    <!-- <body>
        <div class="flex-center position-ref full-height">
             @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">Register</a>
                        @endif
                    @endauth
                </div>
            @endif -->
<!-- 
            <div class="content">
            @include('home')
                
            </div>
        </div>
    </body> --> 
    <body>
    <div class="container-fluid" id="head">
        <div class="row" >
          <div class="col-sm-12" >
            <h1>Card Customization</h1> <br>
          </div>
          
        </div>
        <div class="row" >
                <div class="col-sm-2" >
                        <p></p>
                      </div>
                      <div class="col-sm-8" >
                            <h6>Impress your guests with a custom invitation made by yourself. FotoJet's online invitation maker offers plenty of free templates, 
                    hundreds of clipart images and text samples to help you create invitation cards design easily and quickly.
                     Choose a template and edit freely to start your design now!</h6>
                          </div>
                <div class="col-sm-2" >
                  <p></p>
                </div>
                
              </div>
      </div>
      <div class="container" id="body">
            <div class="row" >
              <div class="col-sm-12" >
                <h1>Designed invitation card</h1> <br>
              </div>
              
            </div>
            <div class="row" >
                    <div class="col-sm-2" >

                    </div>
                            
                          <div class="col-sm-8" >
                                <p>We offer lots of invitation templates, you can create wedding invitations, birthday invitations, Co-operative invitations, party invitations etc. easily and quickly combining your own creativity.</p>
                              </div>
                    
                              <div class="col-sm-2" >

                                </div>
                  </div>
          </div>

          <div class="container" id="body">
                <div class="row" >
                  <div class="col-sm-12" >
                    <h2>Wedding</h2> <br>
                  </div>
                  
                </div>
                <div class="row" >
                        <div class="col-sm-2" >
    
                        </div>
                                
                              <div class="col-sm-8" >
                                    <p>Design a wedding invitation to warm up your wedding events. A custom invitation will impress your quests deeply and will be cherished forever. Whether you need invitations for engagement party or bridal shower, you can always find a template and inspiration to create one here!</p>
                                  </div>
                        
                                  <div class="col-sm-2" >
    
                             </div>
                      </div>
              </div>
              <div class="container-fluid" id="card">
                  <div class="row" >
                      <div class="col-sm-1">
                          <p></p>
                      </div>
                      <div class="col-sm-3">
                            <div class="card" style="width:350px;">
                                    <img class="card-img-top" src="{{URL::asset('./image/wedding1.png')}}" alt="Card image"   >
                                    <div class="card-body">
                                      <a href="/cardCustomization/wedding/1" class="btn btn-primary">Start Customize</a>
                                    </div>
                                  </div>
                        </div>
                        <div class="col-sm-3">
                                <div class="card" style="width:350px">
                                        <img class="card-img-top" src="{{asset('/image/wedding2.png')}}" alt="Card image" >
                                        <div class="card-body">
                                          <a href="/cardCustomization/wedding/2" class="btn btn-primary">Start Customize</a>
                                        </div>
                                      </div>
                            </div>
                            <div class="col-sm-3">
                                    <div class="card" style="width:350px">
                                            <img class="card-img-top" src="{{URL::asset('/image/wedding3.png')}}" alt="Card image">
                                            <div class="card-body">
                                              <a href="/cardCustomization/wedding/3" class="btn btn-primary">Start Customize</a>
                                            </div>
                                          </div>
                                </div>

                      <div class="col-sm-1">
                        </div>
                  </div>
              </div>
              <div class="container" id="body">
                    <div class="row" >
                      <div class="col-sm-12" >
                        <h2>birthday</h2> <br>
                      </div>
                      
                    </div>
                    <div class="row" >
                            <div class="col-sm-2" >
        
                            </div>
                                    
                                  <div class="col-sm-8" >
                                        <p>Birthday is a big event for everyone. Designing a custom birthday invitation is memorable enough to keep in your mind. A great birthday party deserves a good invitation design. Whether you are creating a 1st birthday invitation for your baby or working on a sweet 16 invitation for your coming 16th birthday, just unleash your creativity</p>
                                      </div>
                            
                                      <div class="col-sm-2" >
        
                                 </div>
                          </div>
                  </div>
                  <div class="container-fluid" id="card">
                      <div class="row" >
                          <div class="col-sm-1">
                              <p></p>
                          </div>
                          <div class="col-sm-3">
                                <div class="card" style="width:350px;">
                                        <img class="card-img-top" src="{{URL::asset('/image/birthday1.png')}}" alt="Card image"   >
                                        <div class="card-body">
                                          <a href="/cardCustomization/birthday/1" class="btn btn-primary">Start Customize</a>
                                        </div>
                                      </div>
                            </div>
                            <div class="col-sm-3">
                                    <div class="card" style="width:350px">
                                            <img class="card-img-top" src="{{URL::asset('/image/birthday2.png')}}" alt="Card image" >
                                            <div class="card-body">
                                              <a href="/cardCustomization/birthday/2" class="btn btn-primary">Start Customize</a>
                                            </div>
                                          </div>
                                </div>
                                <div class="col-sm-3">
                                        <div class="card" style="width:350px">
                                                <img class="card-img-top" src="{{URL::asset('/image/birthday3.png')}}" alt="Card image">
                                                <div class="card-body">
                                                  <a href="/cardCustomization/birthday/3" class="btn btn-primary">Start Customize</a>
                                                </div>
                                              </div>
                                    </div>
    
                          <div class="col-sm-1">
                            </div>
                      </div>
                  </div>
                  <br>
</body>
</html>
