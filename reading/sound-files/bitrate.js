function computeBitRate(bitRes,sampRate) {
	return bitRes*sampRate;
}

function computeFileSize(bitRate,recTime) {
	return bitRate*recTime;
}
