#!/bin/bash
#say() { mpg321 "http://translate.google.com/translate_tts?tl=fr&client=tw-ob&q=\"$*\""; }
say() { mplayer   -noconsolecontrols $1; }
# say() { mplayer -ao alsa  -noconsolecontrols "http://translate.google.com/translate_tts?tl=fr&q=\"$*\""; }
say $*
#echo $*