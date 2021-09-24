package hoon.mytimeline.service;

import hoon.mytimeline.domain.Memo;
import hoon.mytimeline.dto.MemoRequestDto;
import hoon.mytimeline.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MemoService {
    private final MemoRepository memoRepository;

    @Transactional
    public Long update(Long id, MemoRequestDto requestDto){
        Memo memo = memoRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("ID does not exist.")
        );
        memo.update(requestDto);
        return memo.getId();
    }
}
