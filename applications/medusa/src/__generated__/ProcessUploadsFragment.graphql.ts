/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProcessUploadsFragment = {
    readonly id: string;
    readonly reference: string;
    readonly content: ReadonlyArray<{
        readonly urls: ReadonlyArray<{
            readonly url: unknown;
        }>;
    }>;
    readonly " $refType": "ProcessUploadsFragment";
};
export type ProcessUploadsFragment$data = ProcessUploadsFragment;
export type ProcessUploadsFragment$key = {
    readonly " $data"?: ProcessUploadsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ProcessUploadsFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProcessUploadsFragment",
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
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
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
(node as any).hash = '46ecef5940540b1d1811f2c5c8a32fc7';
export default node;
