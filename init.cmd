@echo off

set /P input=Desea desarrollo en produccion?(y/n):
if [%input%]==[] (
    set input=n
)

cd backend
if %input% equ y (
    node dboptions\create-proddata.js
) else (
    node dboptions\create-fakedata.js
)
cd ..

forego start -f Procfile.windows