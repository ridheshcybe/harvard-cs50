#include <stdio.h>

int main(void){
int x = 1
int y = 2;
printf("x is %1,y is %i\n",x,y);
swap(x,y);
printf("x is %1,y is %i\n",x,y);

}

// this doesen't work due to scope 
// the a and b value is copied to a new value every function
void swap(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}