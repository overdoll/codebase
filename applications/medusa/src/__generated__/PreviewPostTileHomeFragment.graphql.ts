/**
 * @generated SignedSource<<200be3b0fa5b78ab771d125c624306fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewPostTileHomeFragment$data = {
  readonly content: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"PreviewPostContentSmallBannerFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"PostLinkTileFragment">;
  readonly " $fragmentType": "PreviewPostTileHomeFragment";
};
export type PreviewPostTileHomeFragment$key = {
  readonly " $data"?: PreviewPostTileHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewPostTileHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewPostTileHomeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PreviewPostContentSmallBannerFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLinkTileFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "10f049a411fe8735c4259d5e5815c089";

export default node;
