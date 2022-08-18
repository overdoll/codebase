/**
 * @generated SignedSource<<20d941ddb20cb7378dfd700e4554b1bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostSlideIndexFragment$data = {
  readonly content: ReadonlyArray<{
    readonly isSupporterOnly: boolean;
    readonly resource: {
      readonly type: ResourceType;
      readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "VideoSnippetFragment">;
    };
  }>;
  readonly reference: string;
  readonly " $fragmentType": "PostSlideIndexFragment";
};
export type PostSlideIndexFragment$key = {
  readonly " $data"?: PostSlideIndexFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSlideIndexFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSlideIndexFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
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
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ImageSnippetFragment"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "VideoSnippetFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "880af6cb732fc903fdba229bfd50dcc5";

export default node;
