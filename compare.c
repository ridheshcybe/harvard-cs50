#include <cs50.h>
#include <stdio.h>

int main(void)
{
   int x = get_int("x");
   int y = get_int("y");
   if (x<y)
   {
    printf("x is less than y\n");
   }
   else
   {
    printf("y is less than x\n");
   }
}