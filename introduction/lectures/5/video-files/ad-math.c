#include <stdio.h>

int main(void)
{
    char *s = "HI!";
    // show me s[0]
    printf("%c", *s);
    // show me s[1]
    printf("%c", *(s + 1));
    // show me s[2]
    printf("%c\n", *(s + 2));
};