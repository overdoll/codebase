/**
 * @generated SignedSource<<70f16959777557da665c28d02dc0f4ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostPreviewContentFragment$data = {
  readonly content: ReadonlyArray<{
    readonly isSupporterOnly: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"InfoRawPostContentBannerFragment">;
  }>;
  readonly state: PostState;
  readonly " $fragmentSpreads": FragmentRefs<"PendingMediaFragment">;
  readonly " $fragmentType": "PostPreviewContentFragment";
};
export type PostPreviewContentFragment$key = {
  readonly " $data"?: PostPreviewContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "InfoRawPostContentBannerFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PendingMediaFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "f253107fdba3727b29c522946ce2c44d";

export default node;
