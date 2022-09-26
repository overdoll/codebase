/**
 * @generated SignedSource<<a52385999f1efc71ac2747493b820b9f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewPostContentSmallBannerFragment$data = {
  readonly media: {
    readonly __typename: string;
    readonly duration?: number;
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  };
  readonly " $fragmentType": "PreviewPostContentSmallBannerFragment";
};
export type PreviewPostContentSmallBannerFragment$key = {
  readonly " $data"?: PreviewPostContentSmallBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewPostContentSmallBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewPostContentSmallBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "media",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "duration",
              "storageKey": null
            }
          ],
          "type": "VideoMedia",
          "abstractKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ThumbnailMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "1f4948e0bf73ce1cd0f579235f7d8336";

export default node;
