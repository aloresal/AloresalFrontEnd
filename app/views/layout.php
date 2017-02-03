<?php
    if (!defined("_ALORESAL_")) {
		exit; 	
	}

  if($header)
		echo $this->render($header);
	if($navigator)
		echo $this->render($navigator);
	if($topheader)
		echo $this->render($topheader);
	if($content)
		echo $this->render(Base::instance()->get('content')); 
	if($footer)
		echo $this->render($footer);
		
?>