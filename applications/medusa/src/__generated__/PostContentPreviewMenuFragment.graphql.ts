/**
 * @generated SignedSource<<fd66e6ab0a2755c9d21b4484aa96b6c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentPreviewMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeDownPostContentButtonFragment" | "ArrangeUpPostContentButtonFragment" | "RemovePostContentButtonFragment">;
  readonly " $fragmentType": "PostContentPreviewMenuFragment";
};
export type PostContentPreviewMenuFragment$key = {
  readonly " $data"?: PostContentPreviewMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentPreviewMenuFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeUpPostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RemovePostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeDownPostContentButtonFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "d7beb334832b92e29f588a603158b6e2";

export default node;
