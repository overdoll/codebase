/**
 * @generated SignedSource<<c769a28fcda00ed691158d83b80daf60>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadCharacterStepFragment$data = {
  readonly club: {
    readonly charactersCount: number;
  };
  readonly " $fragmentType": "UploadCharacterStepFragment";
};
export type UploadCharacterStepFragment$key = {
  readonly " $data"?: UploadCharacterStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadCharacterStepFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadCharacterStepFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "charactersCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "fb52c3fc6514013f9036ef7333ef06ec";

export default node;
