/**
 * @generated SignedSource<<8caacb15fe18c69a479a082ebd44b7f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AudienceFragment$data = {
  readonly audience: {
    readonly id: string;
    readonly title: string;
  } | null;
  readonly " $fragmentType": "AudienceFragment";
};
export type AudienceFragment = AudienceFragment$data;
export type AudienceFragment$key = {
  readonly " $data"?: AudienceFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AudienceFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AudienceFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "126deb9c50d61d0ae365103c12492081";

export default node;
