from django.shortcuts import render,redirect
from .forms import ContactForm
from .models import Contact

# Create your views here.
def homepage(request):
  if request.method == "POST":
    form = ContactForm(request.POST)
    if form.is_valid():
      form.save()
  sortBy = request.GET.get("sort-by")
  if(sortBy == "none"):
    contacts = Contact.objects.all()
  else:
    contacts = Contact.objects.all().order_by(sortBy)
  form = ContactForm()
  return render(request, "home.html", {"form": form, "contacts":contacts})


def deleteContact(request,telephone1):
    Contact.objects.filter(telephone1 = telephone1).delete()
    return redirect("contacts_app:homepage")


def updateContact(request,telephone1):
    contact = Contact.objects.get(telephone1=telephone1)
    if request.method == "POST":
        form = ContactForm(request.POST,instance=contact)
        if form.is_valid():
            form.save()
            return redirect('contacts_app:homepage')

    form = ContactForm(instance=contact)
    return render(request,"update.html",{"form":form})


def search(request):
    if request.method == "POST":
        search_by = request.POST['search-by']
        query_string = request.POST['search-string']
        if(search_by == "name"):
            contacts = Contact.objects.filter(name=query_string)
            return render(request,"search_result.html",{"contacts":contacts})
        elif(search_by == "telephone1"):
            contacts = Contact.objects.filter(telephone1=query_string)
            return render(request,"search_result.html",{"contacts":contacts})
        elif(search_by == "profession"):
            contacts = Contact.objects.filter(profession=query_string)
            return render(request,"search_result.html",{"contacts":contacts})


def compareNames(request):
    result = "False"
    if(request.method == "POST"):
        name1 = request.POST["name1"]
        name2 = request.POST["name2"]
        contact1 = Contact.objects.filter(name = name1).first()
        contact2 = Contact.objects.filter(name = name2).first()
        if(contact2 != None and contact1 != None):
            result = (contact1 == contact2)

    return render(request,"compare_names.html",{"result":result})
