#include <cs50.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    char *s = get_string("s: ");
    char *t = s;

    // this changes s and at the same time due to pointer
    t[0] = toupper(t[0]);

    printf("%s\n", s);
    printf("%s\n", t);
}