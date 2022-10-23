from django.shortcuts import render
from .forms import PlayerForm
from .models import Player
from .models import Team
from .forms import TeamForm

# Create your views here.
def homepage(request):
  if request.method == "POST":
    form = PlayerForm(request.POST)
    if form.is_valid():
      form.save()
  players = Player.objects.all()
  form = PlayerForm()
  return render(request, "home.html", {"form": form, "players":players})


def teamView(request):
  if (request.method == "POST"):
    form = TeamForm(request.POST)
    if(form.is_valid()):
      form.save()
  teams = Team.objects.all()
  form = TeamForm()
  return render(request,"team.html",{"form":form,"teams":teams})