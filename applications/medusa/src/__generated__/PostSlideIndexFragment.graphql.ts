/**
 * @generated SignedSource<<058fb944ba3f4c77f8d2de90c5509687>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSlideIndexFragment$data = {
  readonly content: ReadonlyArray<{
    readonly isSupporterOnly: boolean;
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "b0eedacfc79453500fe1b19896f44154";

export default node;
